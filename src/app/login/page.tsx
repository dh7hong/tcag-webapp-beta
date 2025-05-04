// src/app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function LoginPage() {
	const router = useRouter();
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");

	const formatPhoneNumber = (value: string) => {
		const nums = value.replace(/\D/g, "").slice(0, 11);
		if (nums.length < 4) return nums;
		if (nums.length < 8)
			return `${nums.slice(0, 3)}-${nums.slice(3)}`;
		return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(
			7
		)}`;
	};

	const handleLogin = async () => {
		const res = await fetch("/api/login", {
			method: "POST",
			body: JSON.stringify({ phoneNumber, password }),
			headers: { "Content-Type": "application/json" },
		});

		if (res.ok) {
			router.push("/profile");
		} else {
			const data = await res.json();
			alert(data.message || "Login failed");
		}
	};

	return (
		<main className="flex items-center justify-center min-h-screen bg-gray-950">
			<div className="max-w-sm p-6 space-y-4 shadow-xl bg-darkCard rounded-xl">
				<h2 className="text-xl font-bold text-center">Login</h2>
				<div className="grid grid-cols-1 gap-4">
					<Input
						placeholder="Phone Number"
						value={phoneNumber}
						onChange={(e) =>
							setPhoneNumber(formatPhoneNumber(e.target.value))
						}
					/>

					<Input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button onClick={handleLogin}>Login</Button>
				</div>

				<div className="text-center">
					<button
						onClick={() => router.push("/signup")}
						className="text-sm underline transition text-accent hover:text-white"
					>
						Don&apos;t have an account? Sign Up
					</button>
				</div>
			</div>
		</main>
	);
}
