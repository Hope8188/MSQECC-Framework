pub fn scrub_pii(text: &str) -> (String, u32) {
    let mut scrubbed = text.to_string();
    let mut count: u32 = 0;

    let ssn_patterns = [
        r"\b\d{3}-\d{2}-\d{4}\b",
        r"\b\d{9}\b",
    ];
    let cc_patterns = [
        r"\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{1,7}\b",
    ];
    let email_pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b";
    let phone_patterns = [
        r"\b\+?1?[- ]?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}\b",
        r"\b\d{3}[.-]\d{3}[.-]\d{4}\b",
    ];

    for pattern in &ssn_patterns {
        if let Ok(re) = regex_lite::Regex::new(pattern) {
            let matches = re.find_iter(&scrubbed).count() as u32;
            count += matches;
            scrubbed = re.replace_all(&scrubbed, "[PII_REDACTED]").to_string();
        }
    }

    for pattern in &cc_patterns {
        if let Ok(re) = regex_lite::Regex::new(pattern) {
            let matches = re.find_iter(&scrubbed).count() as u32;
            count += matches;
            scrubbed = re.replace_all(&scrubbed, "[CC_REDACTED]").to_string();
        }
    }

    if let Ok(re) = regex_lite::Regex::new(email_pattern) {
        let matches = re.find_iter(&scrubbed).count() as u32;
        count += matches;
        scrubbed = re.replace_all(&scrubbed, "[EMAIL_REDACTED]").to_string();
    }

    for pattern in &phone_patterns {
        if let Ok(re) = regex_lite::Regex::new(pattern) {
            let matches = re.find_iter(&scrubbed).count() as u32;
            count += matches;
            scrubbed = re.replace_all(&scrubbed, "[PHONE_REDACTED]").to_string();
        }
    }

    (scrubbed, count)
}

#[cfg(test)]
mod tests {
    use super::scrub_pii;

    #[test]
    fn scrub_pii_leaves_clean_text_untouched() {
        let input = "Lumina stores only local diagnostic summaries.";
        let (scrubbed, count) = scrub_pii(input);

        assert_eq!(scrubbed, input);
        assert_eq!(count, 0);
    }

    #[test]
    fn scrub_pii_redacts_multiple_sensitive_types() {
        let input = "Contact jane@example.com, call 555-123-4567, and archive SSN 123-45-6789.";
        let (scrubbed, count) = scrub_pii(input);

        assert!(scrubbed.contains("[EMAIL_REDACTED]"));
        assert!(scrubbed.contains("[PHONE_REDACTED]"));
        assert!(scrubbed.contains("[PII_REDACTED]"));
        assert_eq!(count, 3);
    }

    #[test]
    fn scrub_pii_redacts_credit_card_sequences() {
        let input = "Card on file: 4111 1111 1111 1111.";
        let (scrubbed, count) = scrub_pii(input);

        assert!(scrubbed.contains("[CC_REDACTED]"));
        assert_eq!(count, 1);
    }
}
