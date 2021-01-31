import AuthForm from 'components/AuthForm/AuthForm';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/channels/@me">
        <h1 className="cursor-pointer inline-block">Home</h1>
      </Link>
      <h1 className="font-primary">Login</h1>
      <AuthForm type="signIn" />
      <h1 className="font-primary">Sign Up</h1>
      <AuthForm type="signUp" />
    </div>
  );
}
