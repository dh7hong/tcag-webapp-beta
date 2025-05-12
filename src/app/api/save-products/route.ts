// src/app/api/save-products/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongoose";
import Product from "@/lib/models/Product";

export async function POST(req: NextRequest) {
	await connectMongoDB();
	const { imageUrls } = await req.json();

	const products = imageUrls.map((url: string) => {
		const fileName = url.split("/").pop()?.replace(".png", "");
		if (!fileName) {
			throw new Error("Invalid URL: no filename extracted");
		}
		const [
			brandName,
			productId,
			category,
			gender,
			productName,
			productPrice,
		] = fileName.split("_");

		return {
			brandName,
			productId,
			category,
			gender,
			productName: productName.replace(/-/g, " "),
			productPrice: productPrice.replace("-krw", "") + " KRW",
			productImageUrl: url,
			xCoordinate: null,
			yCoordinate: null,
			floorNum: null,
		};
	});

	await Product.insertMany(products);
	return NextResponse.json({
		success: true,
		inserted: products.length,
	});
}
