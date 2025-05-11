"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function CoordinateGenerator() {
	const [products, setProducts] = useState([]);
	const [selectedProductId, setSelectedProductId] = useState("");
	const [floorNum, setFloorNum] = useState(1);
	const mapRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		axios
			.get("/api/products")
			.then((res) => setProducts(res.data.products));
	}, []);

	const handleMapClick = async (e: React.MouseEvent) => {
		if (!selectedProductId)
			return alert("Select a product first.");

		const rect = mapRef.current?.getBoundingClientRect();
		if (rect) {
			const x = (
				((e.clientX - rect.left) / rect.width) *
				100
			).toFixed(1);
			const y = (
				((e.clientY - rect.top) / rect.height) *
				100
			).toFixed(1);

			await axios.post("/api/products/set-coordinates", {
				productId: selectedProductId,
				xCoordinate: parseFloat(x),
				yCoordinate: parseFloat(y),
				floorNum,
			});

			alert(`Coordinates updated: X=${x}%, Y=${y}%`);
		}
	};

	return (
		<div className="min-h-screen p-8 text-white bg-gray-950">
			<div className="flex gap-4 mb-4">
				<select
					className="px-4 py-2 bg-gray-800 rounded"
					value={selectedProductId}
					onChange={(e) => setSelectedProductId(e.target.value)}
				>
					<option value="">Select Product</option>
					{products.map((prod: any) => (
						<option key={prod.productId} value={prod.productId}>
							{prod.productName} ({prod.productId})
						</option>
					))}
				</select>

				<input
					type="number"
					placeholder="Floor Number"
					className="px-4 py-2 bg-gray-800 rounded"
					value={floorNum}
					onChange={(e) => setFloorNum(Number(e.target.value))}
				/>
			</div>

			<div className="inline-block cursor-crosshair">
				<img
					ref={mapRef}
					src="/assets/images/tcag/map/tcag_store-map.png"
					alt="Store Map"
					className="max-w-3xl cursor-crosshair"
					onClick={handleMapClick}
				/>
			</div>
		</div>
	);
}
