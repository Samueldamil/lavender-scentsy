import Footer from "../components/Footer";
import ClientProducts from "../components/ClientProducts";
import Navbar from "../components/Navbar";

export default function Women() {

    return (
        <div className="app">
            <Navbar />
            <section className="content store-page">
                <h1>Women's Fragrances</h1>

                <ClientProducts category="women" />
            </section>
            <Footer />
        </div>
    );
}