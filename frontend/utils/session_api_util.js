export const fetchUser = () => (
  $.ajax({
    method: "GET",
    url: "api/users/"
  })
)