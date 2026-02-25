export default async function handler(req, res) {
    try{const { id } = req.query; // Vercel يمرر الـ params
    const response = await fetch(
      `https://fakerestaurantapi.runasp.net/api/Restaurant/${id}/menu`
    );
  
    const data = await response.json();
    res.status(200).json(data);}
    catch(err){
      res.status(500).json({ error: `Failed to fetch restaurant ${id}` });
    }}
  