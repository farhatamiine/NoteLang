'use client'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Globe} from "lucide-react"
import OnBoardingForm from "@/components/onBoarding/onBoardingForm";


export default function OnBoardingPage() {


    return (
        <div
            className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                <Card className="shadow-lg border-0">
                    <CardHeader className="text-center space-y-4">
                        <div
                            className="mx-auto w-12 h-12 dark:bg-white bg-black  rounded-full flex items-center justify-center">
                            <Globe className="w-6 h-6 text-white dark:text-black"/>
                        </div>
                        <div>
                            <CardTitle
                                className="text-2xl font-bold  dark:text-white text-black ">
                                Welcome to NoteLang!
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                {"Let's get to know you better and personalize your language learning journey"}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <OnBoardingForm/>
                    </CardContent>
                </Card>

                <div className="text-center text-xs text-muted-foreground">
                    <p>Your information is secure and will only be used to personalize your experience.</p>
                </div>
            </div>
        </div>
    );
}
