import { NextResponse } from "next/server"

export const GET = (request: Request) => {
    return NextResponse.json({message: 'Fetched successfully.'}, { status: 200 });
}

export const POST = (request: Request) => {
    return NextResponse.json({message: 'Fetched successfully.'}, { status: 201 });
}