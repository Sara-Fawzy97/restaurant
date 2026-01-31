export default async function handler(req, res) {
  const response = await fetch(
    'https://fakerestaurantapi.runasp.net/api/Restaurant'
  );

  const data = await response.json();
  res.status(200).json(data);
}
