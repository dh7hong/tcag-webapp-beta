// src/components/SignUpForm.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Input from "./Input";
import Dropdown from "./Dropdown";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
	const [form, setForm] = useState({
		phoneNumber: "",
		password: "",
		age: "",
		gender: "",
		preferredStyle: "",
		heightCm: "",
		preferredSize: "",
		preferredColors: "",
		bodyType: "",
		shoppingFrequency: "",
		avgSpend: "",
	});

	const [verificationCode, setVerificationCode] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [codeSent, setCodeSent] = useState(false);
	const [timeLeft, setTimeLeft] = useState(300);
	const timerRef = useRef<number | null>(null);

	// inside SignUpForm component:
	const router = useRouter();

	useEffect(() => {
		if (timeLeft === 0 && timerRef.current !== null) {
			clearInterval(timerRef.current);
			setCodeSent(false);
			alert("Verification code expired. Please resend.");
		}
	}, [timeLeft]);

	const startTimer = () => {
		setTimeLeft(300);
		if (timerRef.current !== null) {
			clearInterval(timerRef.current);
		}
		timerRef.current = window.setInterval(
			() => setTimeLeft((prev) => prev - 1),
			1000
		);
	};

	const formatTime = (seconds: number) =>
		`${Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0")}:${(seconds % 60)
			.toString()
			.padStart(2, "0")}`;

	const handleChange = (field: string, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const formatPhoneNumber = (value: string) => {
		const nums = value.replace(/\D/g, "").slice(0, 11);
		if (nums.length < 4) return nums;
		if (nums.length < 8)
			return `${nums.slice(0, 3)}-${nums.slice(3)}`;
		return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(
			7
		)}`;
	};

	const handlePhoneChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		handleChange(
			"phoneNumber",
			formatPhoneNumber(e.target.value)
		);
	};

	const handleSendCode = async () => {
		const res = await fetch("/api/sendVerification", {
			method: "POST",
			body: JSON.stringify({ phoneNumber: form.phoneNumber }),
			headers: { "Content-Type": "application/json" },
		});

		if (res.ok) {
			setCodeSent(true);
			startTimer();
			alert("Verification code sent.");
		} else {
			const { error } = await res.json();
			console.error("SEND VERIFICATION ERROR:", error);
			alert(`Failed to send code: ${error}`);
		}
	};

	const handleVerifyCode = async () => {
		const res = await fetch("/api/verifyCode", {
			method: "POST",
			body: JSON.stringify({
				phoneNumber: form.phoneNumber,
				code: verificationCode,
			}),
			headers: { "Content-Type": "application/json" },
		});

		if (res.ok) {
			clearInterval(timerRef.current!);
			setIsVerified(true);
			alert("Phone verified!");
		} else {
			const { error } = await res.json();
			console.error("VERIFY CODE ERROR:", error);
			alert(`Incorrect code: ${error}`);
		}
	};

  const handleSubmit = async () => {
    if (!isVerified) return alert('Verify phone first.');
  
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (res.ok) {
      alert('Signup successful!');
      router.push('/dice');
    } else {
      const { message } = await res.json();
      alert(`Signup failed: ${message}`);
    }
  };

	return (
		<div className="max-w-sm p-6 mx-auto space-y-4 shadow-xl bg-darkCard rounded-xl">
			<h2 className="text-xl font-bold text-center">Sign Up</h2>

			<Input
				placeholder="Phone Number"
				value={form.phoneNumber}
				onChange={handlePhoneChange}
			/>

			<Button onClick={handleSendCode}>
				{codeSent
					? "Resend Verification Code"
					: "Send Verification Code"}
			</Button>

			{codeSent && (
				<div className="space-y-4">
					<Input
						placeholder="Verification Code"
						value={verificationCode}
						onChange={(e) => setVerificationCode(e.target.value)}
					/>
					{!isVerified && (
						<Button onClick={handleVerifyCode}>
							Verify Code
						</Button>
					)}
					<p className="text-xs text-gray-400">
						Code expires in: {formatTime(timeLeft)}
					</p>
				</div>
			)}

			{isVerified && (
				<p className="font-semibold text-green-400">
					✅ Phone Verified!
				</p>
			)}

			<div className="grid grid-cols-2 gap-4">
				<Input
					type="password"
					placeholder="Password"
					onChange={(e) =>
						handleChange("password", e.target.value)
					}
				/>
				<Input
					placeholder="Age"
					onChange={(e) => handleChange("age", e.target.value)}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Dropdown
					placeholder="Gender"
					options={["Male", "Female", "Other"]}
					value={form.gender}
					onChange={(v) => handleChange("gender", v)}
				/>
				<Dropdown
					placeholder="Style"
					options={["Casual", "Formal", "Sporty"]}
					value={form.preferredStyle}
					onChange={(v) => handleChange("preferredStyle", v)}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Input
					placeholder="Height (cm)"
					onChange={(e) =>
						handleChange("heightCm", e.target.value)
					}
				/>
				<Dropdown
					placeholder="Size"
					options={["XXS", "XS", "S", "M", "L", "XL", "XXL"]}
					value={form.preferredSize}
					onChange={(v) => handleChange("preferredSize", v)}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Dropdown
					placeholder="Favorite Color"
					options={[
						"Black",
						"White",
						"Gray",
						"Blue",
						"Red",
						"Green",
						"Yellow",
						"Pink",
						"Brown",
						"Beige",
					]}
					value={form.preferredColors}
					onChange={(v) => handleChange("preferredColors", v)}
				/>
				<Dropdown
					placeholder="Body Type"
					options={["Slim", "Average", "Athletic", "Plus-size"]}
					value={form.bodyType}
					onChange={(v) => handleChange("bodyType", v)}
				/>
			</div>

			<Dropdown
				placeholder="How often do you shop?"
				options={["Weekly", "Monthly", "Seasonally"]}
				value={form.shoppingFrequency}
				onChange={(v) => handleChange("shoppingFrequency", v)}
			/>

			<Dropdown
				placeholder="What is your budget?"
				options={[
					"10,000 KRW - 30,000 KRW",
					"30,000 KRW - 60,000 KRW",
					"60,000 KRW - 100,000 KRW",
					"100,000 KRW - 200,000 KRW",
					"200,000 KRW - 400,000 KRW",
					"400,000 KRW - 700,000 KRW",
					"700,000 KRW - 1,000,000 KRW",
					"1,000,000 KRW - 2,000,000 KRW",
					"2,000,000 KRW+",
				]}
				value={form.avgSpend}
				onChange={(v) => handleChange("avgSpend", v)}
			/>

			<Button onClick={handleSubmit}>Sign Up</Button>
		</div>
	);
}
