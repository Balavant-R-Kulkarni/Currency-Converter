require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const https = require('https')

const app = express()

const API_URL = 'https://v6.exchangerate-api.com/v6'

const corsOptions = {
    origin: process.env.CLIENT_URL || true,
}

app.use(express.json())
app.use(cors(corsOptions))

const httpsAgent = process.env.IGNORE_SELF_SIGNED_CERTS === 'true'
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined

app.get('/', (req, res) => {
    res.send('Currency Converter API is running')
})

app.post('/api/convert', async (req, res) => {
    const { amount, from, to } = req.body

    if (!from || !to || !amount) {
        return res.status(400).json({
            error: 'Invalid request',
            details: 'from, to, and amount are required fields',
        })
    }

    if (typeof amount !== 'number' && isNaN(Number(amount))) {
        return res.status(400).json({
            error: 'Invalid request',
            details: 'amount must be a valid number',
        })
    }

    try {
        const response = await axios.get(
            `${API_URL}/${process.env.API_KEY}/pair/${from}/${to}/${amount}`,
            { httpsAgent }
        )

        res.json({
            base: from,
            target: to,
            amount,
            rate: response.data.conversion_rate,
            convertedAmount: response.data.conversion_result,
        })
    } catch (error) {
        const details = error.response?.data?.error || error.response?.data || error.message
        console.error('Currency conversion request failed:', details)
        res.status(error.response?.status || 500).json({
            error: 'Currency conversion failed. Check API key, network, and TLS settings.',
            details,
        })
    }
})

const PORT = process.env.PORT || 8080

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`)
})

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason)
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
    // Optional: exit process in production so the platform can restart the service
    // process.exit(1)
})
