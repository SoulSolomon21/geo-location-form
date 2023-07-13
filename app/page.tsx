'use client'
import GeocodingForm from "@/components/GeoCodingForm";
import GeocodingResults from "@/components/GeoCodingResults";
import Header from "@/components/Header";
import * as opencage from "opencage-api-client";
import { useState } from "react";

interface FormState {
  query: string;
  isSubmitting: boolean;
  response: any;
}

export default function Home() {
  const [formState, setFormState] = useState<FormState>({
    query: "",
    isSubmitting: false,
    response: {},
  });

  const handleChange = (key: keyof FormState, value: string | boolean) => {
    setFormState((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setFormState((prevState: any) => ({
      ...prevState,
      isSubmitting: true,
    }));

    opencage
      .geocode({ key: '4bef3a5ba38d406696153025d30d0a82', q: formState.query })
      .then((response: any) => {
        setFormState((prevState: any) => ({
          ...prevState,
          response,
          isSubmitting: false,
        }));
      })
      .catch((err: any) => {
        console.error(err);
        setFormState((prevState: any) => ({
          ...prevState,
          response: {},
          isSubmitting: false,
        }));
      });
  };

  return (
    <main className="">
      <Header />
      <GeocodingForm
        isSubmitting={formState.isSubmitting}
        query={formState.query}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
      <GeocodingResults response={formState.response} />
    </main>
  );
}
