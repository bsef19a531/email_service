export default async function handler(req, res) {
    const message = "Hello from your Vercel serverless function!";
    res.status(200).json({ message });
}