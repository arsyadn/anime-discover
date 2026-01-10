import Wishlist from "../components/Wishlist";
import Navbar from "../components/Navbar";

const WishlistWrapper = () => {
  return (
    <>
      <Navbar
        isNoFilterIncluded={true}
        search=""
        onSearchChange={() => {}}
        category=""
        onCategoryChange={() => {}}
        sort=""
        onSortChange={() => {}}
        year=""
        onYearChange={() => {}}
      />
      <Wishlist />
    </>
  );
};

export default WishlistWrapper;
