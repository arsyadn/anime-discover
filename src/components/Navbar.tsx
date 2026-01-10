import { useState } from "react";
import styled from "styled-components";
import { Menu, X, LogOut, User, Heart } from "lucide-react";
import {
  arrCategories,
  arrSortOptions,
  arrYearOptions,
} from "../data/AnimeList";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

interface NavbarProps {
  isNoFilterIncluded?: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  year: string;
  onYearChange: (value: string) => void;
}

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.6px;
  cursor: pointer;
`;

const Input = styled.input`
  max-width: 260px;
  padding: 10px 14px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: none;

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const Select = styled.select`
  padding: 10px 14px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const AvatarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  background: #020617;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  min-width: 180px;
`;

const DropItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  color: white;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const MobileActions = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobilePanel = styled.div<{ open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "block" : "none")};
    padding: 16px 20px;
    background: rgba(0, 0, 0, 0.96);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

const MobileStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Navbar: React.FC<NavbarProps> = ({
  isNoFilterIncluded,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  year,
  onYearChange,
}) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const loggedIn = isLoggedIn();

  const showFilter = !isNoFilterIncluded;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Bar>
      <Inner>
        <Left>
          <Logo onClick={() => navigate("/")}>ANIME DISCOVER</Logo>
        </Left>

        {/* Desktop */}
        <Right>
          {showFilter && (
            <>
              <Select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
              >
                {arrCategories.map((item, id) => (
                  <option
                    key={id}
                    value={item === "All Categories" ? "" : item.toLowerCase()}
                  >
                    {item}
                  </option>
                ))}
              </Select>
              <Select
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
              >
                {arrSortOptions.map((item, id) => (
                  <option key={id} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>

              <Select
                value={year}
                onChange={(e) => onYearChange(e.target.value)}
              >
                {arrYearOptions.map((y) => (
                  <option key={y.value} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </Select>

              <Input
                placeholder="Search anime..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </>
          )}

          {!loggedIn ? (
            <AvatarButton onClick={() => navigate("/login")}>
              <User size={18} /> Login
            </AvatarButton>
          ) : (
            <div style={{ position: "relative" }}>
              <AvatarButton onClick={() => setMenuOpen((v) => !v)}>
                <User size={18} /> {localStorage.getItem("user_name")}
              </AvatarButton>

              {menuOpen && (
                <Dropdown>
                  <DropItem onClick={() => navigate("/wishlist")}>
                    <Heart size={16} /> Wishlist
                  </DropItem>
                  <DropItem onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </DropItem>
                </Dropdown>
              )}
            </div>
          )}
        </Right>

        <MobileActions>
          <IconButton onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </IconButton>
        </MobileActions>
      </Inner>

      <MobilePanel open={mobileOpen}>
        <MobileStack>
          {showFilter && (
            <>
              <Input
                placeholder="Search anime..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
              />

              <Select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
              >
                {arrCategories.map((c) => (
                  <option
                    key={c}
                    value={c === "All Categories" ? "" : c.toLowerCase()}
                  >
                    {c}
                  </option>
                ))}
              </Select>

              <Select
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
              >
                {arrSortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>

              <Select
                value={year}
                onChange={(e) => onYearChange(e.target.value)}
              >
                {arrYearOptions.map((y) => (
                  <option key={y.value} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </Select>
            </>
          )}

          {loggedIn ? (
            <>
              <AvatarButton onClick={() => navigate("/wishlist")}>
                <Heart size={16} /> Wishlist
              </AvatarButton>
              <AvatarButton onClick={handleLogout}>
                <LogOut size={18} /> Logout
              </AvatarButton>
            </>
          ) : (
            <AvatarButton onClick={() => navigate("/login")}>
              <User size={18} /> Login
            </AvatarButton>
          )}
        </MobileStack>
      </MobilePanel>
    </Bar>
  );
};

export default Navbar;
