import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ClientProducts from "../components/ClientProducts";

export default function Men() {

    return (
        <div className="app">
            <Navbar />
            <section className="content store-page">
                <h1>Men's Fragrances</h1>

                <ClientProducts category="men" />
            </section>
            <Footer />
        </div>
    );
}