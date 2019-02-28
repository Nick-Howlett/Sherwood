export const fetchStock = id => (
  $.ajax({
    method: "GET",
    url: `api/stocks/${id}`
  })
)