'use client';
import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InvoiceSchema } from '@/lib/schema'; // Replace with your schema file path
import { z } from 'zod';
import {
    Form,
    FormItem,
    FormField,
    FormControl,
    FormDescription,
    FormMessage,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from './ui/separator';

export default function InvoiceForm() {
    const form = useForm<z.infer<typeof InvoiceSchema>>({
        resolver: zodResolver(InvoiceSchema),
        defaultValues: {
            clientName: '',
            clientEmail: '',
            items: [{ name: '', quantity: 1, price: 0 }],
            gst: 0,
            discount: 0,
        },
    });

    const { control, handleSubmit, watch } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items', // Match the schema's "items"
    });
    console.log(fields);
    // Watch the fields for dynamic calculations
    const items = useWatch({ control, name: 'items' });
    const gst = watch('gst') || 0;
    const discount = watch('discount') || 0;

    // Calculate subtotal, GST, discount, and grand total
    const subtotal = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );
    const gstAmount = (subtotal * gst) / 100;
    const discountAmount = (subtotal * discount) / 100;
    const grandTotal = subtotal + gstAmount - discountAmount;

    const onSubmit = (data: z.infer<typeof InvoiceSchema>) => {
        console.log('Invoice Data:', {
            ...data,
            subtotal,
            gstAmount,
            discountAmount,
            grandTotal,
        });
        alert('Invoice generated successfully!');
    };

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col p-4 w-full "
            >
                <div className="grid grid-cols-2 gap-3">
                    {/* Client Name */}
                    <FormField
                        control={form.control}
                        name="clientName"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Client Name</Label>
                                <FormControl>
                                    <Input
                                        placeholder="Enter client's name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Client Email */}
                    <FormField
                        control={form.control}
                        name="clientEmail"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Client Email</Label>
                                <FormControl>
                                    <Input
                                        placeholder="Enter client's email"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col ">
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'w-[240px] pl-3 text-left font-normal',
                                                    !field.value &&
                                                        'text-muted-foreground'
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, 'PPP')
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Your date of birth is used to calculate your
                                    age.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator className="my-5" />

                {/* Invoice Items */}
                <div className="flex flex-col space-y-4">
                    <FormLabel>Invoice Items</FormLabel>
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className={cn(
                                'flex w-full space-x-2 pb-4 max-h-full overflow-scroll',
                                index !== fields.length - 1 && 'border-b' // Add border-b only if it's not the last item
                            )}
                        >
                            {/* Description */}
                            <FormField
                                control={form.control}
                                name={`items.${index}.name`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <Label>Name</Label>
                                        <FormControl>
                                            <Input
                                                placeholder="Item name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Quantity */}
                            <FormField
                                control={form.control}
                                name={`items.${index}.quantity`}
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Quantity</Label>
                                        <FormControl>
                                            <Input
                                                placeholder="Item quantity"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Price */}
                            <FormField
                                control={form.control}
                                name={`items.${index}.price`}
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Price</Label>
                                        <FormControl>
                                            <Input
                                                placeholder="Item price"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Remove Item */}
                            {index !== 0 && (
                                <div className="flex items-end">
                                    <Button
                                        variant="destructive"
                                        type="button"
                                        onClick={() => remove(index)}
                                    >
                                        Remove Item
                                    </Button>
                                </div>
                            )}

                            {/* Add New Item */}
                            {fields.length - 1 == index && (
                                <div className="flex items-end">
                                    <Button
                                        className=""
                                        variant="secondary"
                                        type="button"
                                        onClick={() =>
                                            append({
                                                name: '',
                                                quantity: 1,
                                                price: 0,
                                            })
                                        }
                                    >
                                        Add Item
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <Separator className="my-5" />

                <div className="space-y-2">
                    {/* GST */}
                    <FormField
                        control={form.control}
                        name="gst"
                        render={({ field }) => (
                            <FormItem>
                                <Label>GST (%)</Label>
                                <FormControl>
                                    <Input
                                        placeholder="Enter GST percentage"
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Discount */}
                    <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Discount (%)</Label>
                                <FormControl>
                                    <Input
                                        placeholder="Enter discount percentage"
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator className="my-8" />

                {/* Total Section */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="font-medium">Subtotal:</span>
                        <span>{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">GST Amount:</span>
                        <span>{gstAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Discount Amount:</span>
                        <span>{discountAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                        <span>Grand Total:</span>
                        <span>{grandTotal.toFixed(2)}</span>
                    </div>
                </div>
                {/* Submit Button */}
                <Button type="submit" variant="outline" className="w-full my-3">
                    Generate Invoice
                </Button>
            </form>
        </Form>
    );
}
