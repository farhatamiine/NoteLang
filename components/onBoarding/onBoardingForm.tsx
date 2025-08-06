import React from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {onBoardingFormSchema} from "@/lib/schema";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {LANGUAGES} from "@/lib/const";
import {useSaveProfile} from "@/lib/features/profile/useProfile";


const OnBoardingForm = () => {
    const onBoardingForm = useForm<z.infer<typeof onBoardingFormSchema>>({
        resolver: zodResolver(onBoardingFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            nativeLanguage: "",
            targetLanguage: "",
        },
    })
    const {mutate, isPending} = useSaveProfile();

    function onSubmit(values: z.infer<typeof onBoardingFormSchema>) {
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("nativeLanguage", values.nativeLanguage);
        formData.append("targetLanguage", values.targetLanguage);

        mutate(formData);

    }

    return (
        <Form  {...onBoardingForm}>
            <form onSubmit={onBoardingForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <FormField
                            control={onBoardingForm.control}
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Firstname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="firstname" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <FormField
                            control={onBoardingForm.control}
                            name="lastName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="lastname" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                {/* Native Language */}
                <div className="space-y-2">
                    <FormField
                        control={onBoardingForm.control}
                        name="nativeLanguage"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Native Language</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className={"w-full"}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your native language"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {LANGUAGES.map((language) => (
                                            <SelectItem key={language.value} value={language.value}>
                                                {language.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <FormField
                        control={onBoardingForm.control}
                        name="targetLanguage"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Target Language</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className={"w-full"}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your target language"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className={"w-full"}>
                                        {LANGUAGES.map((language) => (
                                            <SelectItem key={language.value} value={language.value}>
                                                {language.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full h-11 font-medium"
                    disabled={!onBoardingForm.formState.isValid}
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
        </Form>
    );
};

export default OnBoardingForm;