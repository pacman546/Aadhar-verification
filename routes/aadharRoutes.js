import express from 'express';
import axios from 'axios';

const router = express.Router();

const AUA_CODE = 'YOUR_AUA_CODE';
const SUB_AUA_CODE = 'YOUR_SUB_AUA_CODE';
const TRANSACTION_ID = 'YOUR_TRANSACTION_ID';
const LICENSE_KEY = 'YOUR_LICENSE_KEY';

router.post('/request-otp', async (req, res) => {
    const { aadharNumber } = req.body;

    try {
        const response = await axios.post('https://auth.uidai.gov.in/otp/2.5', {
            uid: aadharNumber,
            ac: AUA_CODE,
            sa: SUB_AUA_CODE,
            ver: '2.5',
            txn: TRANSACTION_ID,
            ts: new Date().toISOString(),
            lk: LICENSE_KEY,
            type: 'A',
            Opts: {
                ch: '00'
            }
        });

        if (response.data && response.data.OtpRes && response.data.OtpRes.ret === 'y') {
            res.json({ message: 'OTP sent successfully' });
        } else {
            res.status(400).json({ error: 'Failed to send OTP' });
        }
    } catch (error) {
        console.error('Error requesting OTP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/verify-otp', async (req, res) => {
    const { aadharNumber, otp } = req.body;

    //  verify the OTP against a secure store or service
    // For demonstration, we assume it's always successful
    res.json({ message: 'Aadhar verified successfully' });
});

export default router;
