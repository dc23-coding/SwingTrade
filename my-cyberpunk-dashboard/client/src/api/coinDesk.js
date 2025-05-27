export async function getHistoricalDays(instrument, start, end, limit) {
  const key = import.meta.env.VITE_COINDESK_API_KEY;
  const url = 'https://data-api.coindesk.com/spot/v1/historical/days';
  const params = { instrument, start, end, limit, api_key: key };
  const res = await fetch(`${url}?${new URLSearchParams(params)}`);
  const json = await res.json();
  // format to lightweight-charts data
  return json.data.map(({ time, open, high, low, close }) => ({ time, open, high, low, close }));
}