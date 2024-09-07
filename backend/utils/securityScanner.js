export const performSecurityScanOnCode = async (code, language) => {
  let vulnerabilities = [];
  const patterns = {
    JavaScript: [
      { regex: /eval\s*\(/, message: 'Use of eval() can lead to code injection vulnerabilities.' },
      { regex: /document\.cookie/, message: 'Potential XSS vulnerability through document.cookie.' },
      { regex: /innerHTML\s*=/, message: 'Assignment to innerHTML can lead to XSS vulnerabilities.' },
    ],
    Python: [
      { regex: /exec\s*\(/, message: 'Use of exec() can lead to code injection vulnerabilities.' },
      { regex: /subprocess\.Popen\s*\(/, message: 'Command injection via subprocess.Popen().' },
    ],
    Java: [
      { regex: /Runtime\.getRuntime\(\)\.exec/, message: 'Command injection vulnerability via Runtime.getRuntime().exec().' },
      { regex: /String\s*\+\s*"SELECT/, message: 'SQL injection vulnerability via string concatenation in SQL query.' },
    ],
    Cpp: [
      { regex: /strcpy\s*\(/, message: 'Buffer overflow vulnerability via strcpy().' },
      { regex: /system\s*\(/, message: 'Command injection vulnerability via system().' },
    ],
  };

  const selectedPatterns = patterns[language];
  if (selectedPatterns) {
    selectedPatterns.forEach((pattern) => {
      if (pattern.regex.test(code)) {
        vulnerabilities.push(pattern.message);
      }
    });
  } else {
    vulnerabilities.push('No security patterns available for this language.');
  }

  if (vulnerabilities.length === 0) {
    vulnerabilities.push('No vulnerabilities found.');
  }

  return vulnerabilities;
};
