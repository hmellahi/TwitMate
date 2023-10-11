const ma = async () => {
  const userId = "user_2UcEXkMmpicOvQCTkOsO0ocOhLD"; // Replace with the actual user ID
  const newPhotoUrl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/05ffe684-02b4-4117-ab42-361fdf6d36a4/dxn6qz-94b857d5-1073-47cb-9389-ea35a2c172cd.jpg/v1/fill/w_240,h_320,q_75,strp/dsadsa_by_bethamphetaminee_dxn6qz-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzIwIiwicGF0aCI6IlwvZlwvMDVmZmU2ODQtMDJiNC00MTE3LWFiNDItMzYxZmRmNmQzNmE0XC9keG42cXotOTRiODU3ZDUtMTA3My00N2NiLTkzODktZWEzNWEyYzE3MmNkLmpwZyIsIndpZHRoIjoiPD0yNDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Dg4D1CS8boeH85oLpnQBVMyA2XyMifW3YOlaK9it0lE"; // Replace with the new photo URL
  const CLERK_SECRET_KEY = "sk_test_SeZNOqJjtgDRiehYhaz3ibRhvV7W8dqXWOU3Xoe8Fg";

  const response = await fetch(`https://api.clerk.io/v1/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CLERK_SECRET_KEY}`, // Replace with your Clerk API key
    },
    body: JSON.stringify({
      profile: {
        photo_url: newPhotoUrl,
      },
    }),
  });

  if (response.ok) {
    console.log("Profile photo updated successfully");
  } else {
    const errorData = await response.json();
    console.error("Error updating profile photo:", errorData);
  }
};

ma();
