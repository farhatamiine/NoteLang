// components/notes/NoteForm.tsx
"use client"

import React from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Badge} from "@/components/ui/badge"
import {Loader2, Plus, Save, X} from "lucide-react"
import {Note} from "@/lib/types"
import {noteFormSchema, NoteFormValues} from "@/lib/schemas";

interface NoteFormProps {
    initialData?: Partial<Note>
    onSubmit: (data: NoteFormValues) => void
    onCancel: () => void
    isLoading?: boolean
    mode: "create" | "update"
}

const NOTE_TYPES = [
    {value: "word", label: "Word"},
    {value: "vocabulary", label: "Vocabulary"},
    {value: "phrase", label: "Phrase"},
    {value: "sentence", label: "Sentence"},
    {value: "grammar", label: "Grammar"},
    {value: "idiom", label: "Idiom"}
]

const CATEGORIES = [
    {value: "daily", label: "Daily Life"},
    {value: "business", label: "Business"},
    {value: "travel", label: "Travel"},
    {value: "food", label: "Food & Dining"},
    {value: "culture", label: "Culture"},
    {value: "custom", label: "Custom"}
]

const DIFFICULTIES = [
    {value: "beginner", label: "Beginner"},
    {value: "intermediate", label: "Intermediate"},
    {value: "advanced", label: "Advanced"}
]

export function NoteForm({initialData, onSubmit, onCancel, isLoading = false, mode}: NoteFormProps) {
    const [tagInput, setTagInput] = React.useState("")
    const [customCategory, setCustomCategory] = React.useState(
        initialData?.category && !CATEGORIES.find(cat => cat.value === initialData.category) ? initialData.category : ""
    )

    const form = useForm<NoteFormValues>({
        resolver: zodResolver(noteFormSchema),
        defaultValues: {
            nativeText: initialData?.nativeText || "",
            learningText: initialData?.learningText || "",
            pronunciation: initialData?.pronunciation || "",
            noteType: initialData?.noteType || "",
            category: initialData?.category || "",
            tags: initialData?.tags || [],
            difficulty: initialData?.difficulty || undefined,
        },
    })

    const watchedTags = form.watch("tags")
    const watchedCategory = form.watch("category")

    const handleAddTag = () => {
        if (tagInput.trim() && !watchedTags.includes(tagInput.trim())) {
            form.setValue("tags", [...watchedTags, tagInput.trim()])
            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        form.setValue("tags", watchedTags.filter((tag) => tag !== tagToRemove))
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddTag()
        }
    }

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Native Text */}
                    <FormField
                        control={form.control}
                        name="nativeText"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Native Text</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter text in your native language..."
                                        className="min-h-20 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Learning Text */}
                    <FormField
                        control={form.control}
                        name="learningText"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Learning Text</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter text in the language you're learning..."
                                        className="min-h-20"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Pronunciation */}
                    <FormField
                        control={form.control}
                        name="pronunciation"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Pronunciation (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter pronunciation guide..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Note Type and Category */}
                    <div className="grid grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="noteType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Note Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select type"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {NOTE_TYPES.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select category"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {CATEGORIES.map((category) => (
                                                <SelectItem key={category.value} value={category.value}>
                                                    {category.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                    {watchedCategory === "custom" && (
                                        <Input
                                            placeholder="Enter your own category"
                                            value={customCategory}
                                            onChange={(e) => {
                                                setCustomCategory(e.target.value);
                                                field.onChange(e.target.value);
                                            }}
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Difficulty */}
                    <FormField
                        control={form.control}
                        name="difficulty"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Difficulty (Optional)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select difficulty"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {DIFFICULTIES.map((difficulty) => (
                                            <SelectItem key={difficulty.value} value={difficulty.value}>
                                                {difficulty.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Tags */}
                    <div className="space-y-3">
                        <FormLabel>Tags</FormLabel>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add a tag..."
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="flex-1 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 "
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className={"border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 cursor-pointer disabled:opacity-50 disabled:bg-gray-100 bg-transparent"}
                                onClick={handleAddTag}
                                disabled={!tagInput.trim() || watchedTags.length >= 3}
                            >
                                <Plus className="h-4 w-4"/>
                            </Button>
                        </div>

                        {watchedTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {watchedTags.map((tag) => (
                                    <Badge key={tag}  className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 flex items-center gap-1 px-3 py-1">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-1 hover:text-red-500"
                                        >
                                            <X className="h-3 w-3"/>
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    {mode === "create" ? "Creating..." : "Updating..."}
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4"/>
                                    {mode === "create" ? "Create Note" : "Update Note"}
                                </>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className={"border-gray-200 text-gray-600 hover:bg-gray-50  py-3 px-6 font-semibold transition-all duration-200 bg-transparent"}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}