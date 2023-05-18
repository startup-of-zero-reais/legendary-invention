export async function GET(request: Request) {
    return new Response(JSON.stringify({ message: "Done" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    })
}