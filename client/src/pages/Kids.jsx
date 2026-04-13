import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ClientProducts from "../components/ClientProducts";

export default function Kids() {
    
    return (
        <div className="app">
            <Navbar />
            <section className="content store-page">
                <h1>Men's Fragrances</h1>

                <ClientProducts category="kids" />
            </section>
            <Footer />
        </div>
    );
}