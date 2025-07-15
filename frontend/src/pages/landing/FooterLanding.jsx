import React from "react";

export default function FooterLanding() {
  return (
    <footer id="contato" className="bg-blue-900 text-white py-8 text-center">
      <div>
        &copy; {new Date().getFullYear()} SeuSistema. Todos os direitos reservados.
      </div>
      <div className="mt-2">
        Dúvidas?{" "}
        <a href="mailto:contato@seusistema.com" className="underline">
          contato@seusistema.com
        </a>
      </div>
    </footer>
  );
}
