export default async function handler(req, res) {
    const { id } = req.query; // Vercel يمرر الـ params
    const response = await fetch(
      'https://fakerestaurantapi.runasp.net/api/Restaurant/${id}'
    );
  
    const data = await response.json();
    res.status(200).json(data);
  }
  