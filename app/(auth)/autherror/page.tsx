import React from "react";
type Props = {
  searchParams: {
    error?: string;
  };
};
export default function page({ searchParams }: Props) {
  //TODO
  //Handle error here
  return <div>Auth error : {searchParams.error}</div>;
}
