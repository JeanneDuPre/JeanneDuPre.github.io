function createWordCloud(words, containerId, options) {
	var container = document.getElementById(containerId);
}
	// Create a scale to map word sizes to font sizes
	var sizeScale = d3.scaleLinear()
		.domain(d3.extent(words, d => d.size))
		.range([10, 50]);

	// Create a force simulation to arrange the words
	var simulation = d3.forceSimulation(words)
		.force("center", d3.forceCenter(container.clientWidth / 2, container.clientHeight / 2))
		.force("charge", d3.forceManyBody().strength(-10))
		.force("collision", d3.forceCollide().radius(d => sizeScale(d.size)))
		.stop();

	// Run the simulation for a few steps to settle the words in place
	for (var i = 0; i < 100; i++) {
		simulation.tick();
	}

	// Create a group for each word
	var wordGroups = container.selectAll(".word")
		.data(words)
		.enter()
		.append("g")
		.attr("class", "word")
		.attr("transform", d => `translate(${d.x}, ${d.y})`)
		.on("click", d => options.onWordClick(d.text));

	// Add the text for each word
	wordGroups.append("text")
		.attr("x", 0)
		.attr("y", 0)
		.text(d => d.text)
		.attr("font-size", d => sizeScale(d.size))
		.attr("text-anchor", "middle")
		.attr("alignment-baseline", "central")
		.attr("fill", options.color);

	// Add hover effects to the words
	wordGroups.on("mouseover", function() {
			d3.select(this).select("text")
				.attr("fill", "red")
				.attr("font-size", d => sizeScale(d.size) * 1.2);
		})
		.on("mouseout", function() {
			d3.select(this).select("text")
				.attr("fill", options.color)
				.attr("font-size", d => sizeScale(d.size));
        })
