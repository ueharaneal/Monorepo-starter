"use client";
import React from "react";
import { useTRPC } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";

function Test() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.user.hello.queryOptions({ name: "name" }));

  return <div className="text-red-500">{data?.greeting}</div>;
}

export default Test;
