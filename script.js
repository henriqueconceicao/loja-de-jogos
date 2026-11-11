        const cards = [...document.querySelectorAll(".game-card")];
        const filterButtons = [...document.querySelectorAll(".filter")];
        const searchInput = document.getElementById("search");
        const cartCount = document.getElementById("cartCount");
        const cartButton = document.getElementById("cartButton");
        const emptyState = document.getElementById("emptyState");
        const toast = document.getElementById("toast");
        let activeFilter = "Todos";
        let itemCount = 0;
        let toastTimer;

        function updateGames() {
            const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
            let visibleCount = 0;
            cards.forEach((card) => {
                const matchesGenre = activeFilter === "Todos" || card.dataset.genre.includes(activeFilter);
                const matchesSearch = card.dataset.name.toLocaleLowerCase("pt-BR").includes(query);
                const visible = matchesGenre && matchesSearch;
                card.hidden = !visible;
                if (visible) visibleCount += 1;
            });
            emptyState.style.display = visibleCount ? "none" : "block";
        }

        filterButtons.forEach((button) => {
            button.addEventListener("click", () => {
                activeFilter = button.dataset.filter;
                filterButtons.forEach((filter) => filter.classList.toggle("active", filter === button));
                updateGames();
            });
        });
        searchInput.addEventListener("input", updateGames);
        document.getElementById("clearFilters").addEventListener("click", (event) => {
            event.preventDefault();
            activeFilter = "Todos";
            searchInput.value = "";
            filterButtons.forEach((filter) => filter.classList.toggle("active", filter.dataset.filter === "Todos"));
            updateGames();
        });
        document.querySelectorAll(".add-button").forEach((button) => {
            button.addEventListener("click", () => {
                itemCount += 1;
                cartCount.textContent = itemCount;
                cartButton.setAttribute("aria-label", `Carrinho, ${itemCount} ${itemCount === 1 ? "item" : "itens"}`);
                toast.textContent = `${button.dataset.game} adicionado ao carrinho!`;
                toast.classList.add("show");
                window.clearTimeout(toastTimer);
                toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2400);
            });
        });
        cartButton.addEventListener("click", () => {
            toast.textContent = itemCount ? `Você tem ${itemCount} ${itemCount === 1 ? "jogo" : "jogos"} no carrinho.` : "Seu carrinho está vazio por enquanto.";
            toast.classList.add("show");
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2400);
        });
