import React, { useEffect, useState } from "react";
import { Categories } from "./components/categories/Categories";
import { getListOfCategories } from "../../api/requests";
import { Spacer, Spinner } from "components-lib";
import { useProfile } from "user";

export function Home() {
  const [listCategories, setListCategories] = useState(null);
  const { profile } = useProfile();

  useEffect(() => {
    async function categoriesData() {
      const categories = await getListOfCategories();
      setListCategories(categories);
    }
    categoriesData();
  }, []);

  return (
    <>
      {!listCategories && profile ? (
        <Spinner />
      ) : (
        listCategories &&
        listCategories.items.map((category, index) => (
          <Categories key={index} id={category.id} title={category.name} />
        ))
      )}
      <Spacer height={100} />
    </>
  );
}
