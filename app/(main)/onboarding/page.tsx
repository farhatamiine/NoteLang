'use client'
import {useState} from "react";

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Progress} from "@/components/ui/progress"
import {Globe, ArrowRight} from "lucide-react"

const languages = [
    {value: "english", label: "English"},
    {value: "spanish", label: "Spanish"},
    {value: "french", label: "French"},
    {value: "darija", label: "Darija"},
]

export default function OnBoardingPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        nativeLanguage: "",
        targetLanguage: "",
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log("Form submitted:", formData)
    }

    const isFormValid = formData.firstName && formData.lastName && formData.nativeLanguage && formData.targetLanguage

    return (
        <div
            className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                <Card className="shadow-lg border-0">
                    <CardHeader className="text-center space-y-4">
                        <div
                            className="mx-auto w-12 h-12 bg-white  rounded-full flex items-center justify-center">
                            <Globe className="w-6 h-6 text-black"/>
                        </div>
                        <div>
                            <CardTitle
                                className="text-2xl font-bold  text-white ">
                                Welcome to NoteLang!
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                {"Let's get to know you better and personalize your language learning journey"}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-sm font-medium">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        placeholder="Enter your first name"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-sm font-medium">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Enter your last name"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            {/* Native Language */}
                            <div className="space-y-2">
                                <Label htmlFor="nativeLanguage" className="text-sm font-medium">
                                    What is your native language?
                                </Label>
                                <Select onValueChange={(value) => handleInputChange("nativeLanguage", value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your native language"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map((language) => (
                                            <SelectItem key={language.value} value={language.value}>
                                                {language.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Target Language */}
                            <div className="space-y-2">
                                <Label htmlFor="targetLanguage" className="text-sm font-medium">
                                    Which language would you like to learn?
                                </Label>
                                <Select onValueChange={(value) => handleInputChange("targetLanguage", value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select the language you want to learn"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages
                                            .filter((lang) => lang.value !== formData.nativeLanguage)
                                            .map((language) => (
                                                <SelectItem key={language.value} value={language.value}>
                                                    {language.label}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full h-11 font-medium"
                                disabled={!isFormValid}
                            >
                                Continue Your Journey
                                <ArrowRight className="w-4 h-4 ml-2"/>
                            </Button>
                        </form>

                        {/* Encouragement Text */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                {"You're about to embark on an amazing language learning adventure! 🚀"}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Info */}
                <div className="text-center text-xs text-muted-foreground">
                    <p>Your information is secure and will only be used to personalize your experience.</p>
                </div>
            </div>
        </div>
    );
}
