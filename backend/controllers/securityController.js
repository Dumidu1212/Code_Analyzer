import SecurityResult from '../models/SecurityResult.js';
import { performSecurityScanOnCode } from '../utils/securityScanner.js';

export const analyzeSecurity = async (req, res) => {
  const { code, language } = req.body;
  try {
    const vulnerabilities = await performSecurityScanOnCode(code, language);
    const securityResult = new SecurityResult({ language, vulnerabilities });
    await securityResult.save();
    res.json(securityResult);
  } catch (error) {
    res.status(500).json({ error: 'Error performing security scan.' });
  }
};
