import React from 'react';
import {Control, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {LANGUAGES} from "@/lib/const";
import {onBoardingFormSchema} from "@/lib/schema";
import {useCreateProfile} from "@/lib/queries/profile";
import {CreateProfileData} from "@/lib/types/profile.types";


type OnBoardingFormValues = z.infer<typeof onBoardingFormSchema>;

const FORM_FIELDS = {
    username: {
        label: "Username",
        placeholder: "username"
    },
    firstName: {
        label: "Firstname",
        placeholder: "firstname"
    },
    lastName: {
        label: "Last Name",
        placeholder: "lastname"
    },
    nativeLanguage: {
        label: "Native Language",
        placeholder: "Select your native language"
    },
    targetLanguage: {
        label: "Target Language",
        placeholder: "Select your target language"
    }
} as const;

const NameField: React.FC<{
    control: Control<OnBoardingFormValues>;
    name: "firstName" | "lastName" | "username";
}> = ({control, name}) => (
    <div className="space-y-2">
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{FORM_FIELDS[name].label}</FormLabel>
                    <FormControl>
                        <Input placeholder={FORM_FIELDS[name].placeholder} {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    </div>
);

const LanguageField: React.FC<{
    control: Control<OnBoardingFormValues>;
    name: "nativeLanguage" | "targetLanguage";
}> = ({control, name}) => (
    <div className="space-y-2">
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{FORM_FIELDS[name].label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="w-full">
                            <SelectTrigger>
                                <SelectValue placeholder={FORM_FIELDS[name].placeholder}/>
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
);

const OnBoardingForm = () => {
    const onBoardingForm = useForm<OnBoardingFormValues>({
        resolver: zodResolver(onBoardingFormSchema),
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            nativeLanguage: "",
            targetLanguage: "",
        },
    });

    const {mutateAsync, isPending} = useCreateProfile();

    const onSubmit = async (values: OnBoardingFormValues) => {

        const parsed = onBoardingFormSchema.safeParse(values);
        if (!parsed.success) throw new Error(parsed.error.message);

        const mapped: CreateProfileData = {
            username: parsed.data.username.trim().replace(/\s+/g, "-"),
            fullName: `${parsed.data.firstName} ${parsed.data.lastName}`.trim(),
            nativeLanguage: parsed.data.nativeLanguage,
            targetLanguage: parsed.data.targetLanguage,
            avatarUrl: parsed.data.avatarUrl,
        };

        console.log(mapped);
        await mutateAsync(mapped);
    };

    return (
        <Form {...onBoardingForm}>
            <form onSubmit={onBoardingForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4">
                    <NameField control={onBoardingForm.control} name="username"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <NameField control={onBoardingForm.control} name="firstName"/>
                    <NameField control={onBoardingForm.control} name="lastName"/>
                </div>
                <LanguageField control={onBoardingForm.control} name="nativeLanguage"/>
                <LanguageField control={onBoardingForm.control} name="targetLanguage"/>
                <Button
                    type="submit"
                    className="w-full h-11 font-medium"
                    disabled={!onBoardingForm.formState.isValid || isPending}
                >
                    Continue Your Journey
                    <ArrowRight className="w-4 h-4 ml-2"/>
                </Button>
            </form>
            <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                    {"You're about to embark on an amazing language learning adventure! 🚀"}
                </p>
            </div>
        </Form>
    );
};

export default OnBoardingForm;