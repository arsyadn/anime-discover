import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { fetchCurrentUser } from "../api/kitsu";
import { isLoggedIn } from "../utils/auth";
import { Eye, EyeOff } from "lucide-react";

const Wrapper = styled.div`
  background: url(${process.env.REACT_APP_BACKGROUND_LOGIN_ASSET});
  background-size: cover;
  background-position: center;
  opacity: 0.9;
`;
const Page = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 20px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 8px;
  text-align: center;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 14px;
  opacity: 0.7;
  margin-bottom: 32px;
`;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  margin-bottom: 6px;
  opacity: 0.8;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid #1e293b;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  transition: opacity 0.2s;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    opacity: 0.7;
  }
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 13px;
  margin-top: 12px;
  text-align: center;
`;

const LinkStyled = styled(Link)`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const TogglePassword = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = await login(username, password);

      localStorage.setItem("access_token", token.access_token);
      localStorage.setItem("refresh_token", token.refresh_token);

      const user = await fetchCurrentUser();
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("user_name", user.attributes.name);

      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.error_description || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLogin = isLoggedIn();
    if (isLogin) {
      navigate("/");
    }
  }, []);

  return (
    <Wrapper>
      <Page>
        <Card>
          <Title>Welcome Back</Title>
          <Subtitle>
            Login to your{" "}
            <LinkStyled target="_blank" to="https://kitsu.app/explore/anime">
              Kitsu
            </LinkStyled>{" "}
            account
          </Subtitle>

          <form onSubmit={handleSubmit}>
            <Field>
              <Label>Email</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label>Password</Label>
              <PasswordWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <TogglePassword
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </TogglePassword>
              </PasswordWrapper>
            </Field>

            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {error && <ErrorText>{error}</ErrorText>}
          </form>
        </Card>
      </Page>
    </Wrapper>
  );
}
