import { useFetchCategoriesQuery } from "../store/apis/prodApiSlice";

function SelectOption({ category, subcategory, setCategory, setSubCategory }) {
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useFetchCategoriesQuery();

  const designatedCategory = categories.find((attrs) => attrs.id === category);
  const designatedSubCategory = designatedCategory?.subcategory || [];

  if (isLoading) return <p>載入中</p>;
  if (isError) return <p> {error?.error} </p>;

  return (
    <>
      <label htmlFor="mainCategory">主分類</label>
      <select
        name="mainCategory"
        id="mainCategory"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSubCategory("");
        }}
      >
        <option value="">--please choose a option--</option>
        {categories.map((attrs) => (
          <option key={attrs.id} value={attrs.id}>
            {attrs.label}
          </option>
        ))}
      </select>

      <label htmlFor="subCategory">子分類</label>
      <select
        name="subCategory"
        id="subCategory"
        value={subcategory}
        onChange={(e) => setSubCategory(e.target.value)}
        disabled={!category}
      >
        <option value="">--please choose the second option--</option>
        {designatedSubCategory.map((attrs) => (
          <option key={attrs} value={attrs}>
            {attrs}
          </option>
        ))}
      </select>
    </>
  );
}
export default SelectOption;
