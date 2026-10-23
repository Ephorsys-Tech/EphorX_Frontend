import Logo from "../../assets/Logo.png"

export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-sky-50 via-white to-blue-50 px-4 py-10">
       <div className="w-full max-w-md rounded-2xl border border-sky-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
        <header className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center">
            
          <img src={Logo} className="h-10"/>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Ephor<span className="text-sky-400">X</span>
          </h1>
          </div>

          <p className="text-sm text-slate-500">
            Sign in to your administration portal
          </p>
        </header>

        <section className=" bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
          {children}
        </section>

      </div>
    </main>
  );
}