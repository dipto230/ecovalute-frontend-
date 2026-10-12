
        <div className="my-3 h-px bg-slate-100" />

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/login"
            onClick={closeMobileMenu}
            className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
          >
            Login
          </Link>

          <Link
            href="/register"
            onClick={closeMobileMenu}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Leaf className="h-4 w-4" />
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
