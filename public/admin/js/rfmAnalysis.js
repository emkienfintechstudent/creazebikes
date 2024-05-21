$(document).ready(function() {
    var rowsPerPage = 10;
    var rows = $('#paginatedTable2 tbody tr');
    var rowsCount = rows.length;
    var pageCount = Math.ceil(rowsCount / rowsPerPage);
    var currentPage = 1;
    var visiblePages = 5;

    function generatePageLinks() {
        var startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
        var endPage = Math.min(startPage + visiblePages - 1, pageCount);

        if (endPage - startPage < visiblePages - 1) {
            startPage = Math.max(endPage - visiblePages + 1, 1);
        }

        $('#pageLinks2').empty();
        for (var i = startPage; i <= endPage; i++) {
            var pageLink = $('<a href="#" class="page-link2" data-page="' + i + '">' + i + '</a>');
            if (i == currentPage) {
                pageLink.addClass('active2');
            }
            $('#pageLinks2').append(pageLink);
        }
    }

    function showPage(page) {
        currentPage = page;
        var startRow = (currentPage - 1) * rowsPerPage;
        var endRow = startRow + rowsPerPage;

        rows.hide();
        rows.slice(startRow, endRow).show();

        generatePageLinks();
        updateControls();
    }

    function updateControls() {
        $('#prevPage2').toggleClass('disabled2', currentPage === 1);
        $('#nextPage2').toggleClass('disabled2', currentPage === pageCount);
    }

    $('#paginationControls2').on('click', '.page-link2', function(e) {
        e.preventDefault();
        var page = $(this).data('page');
        showPage(page);
    });

    $('#prevPage2').click(function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    $('#nextPage2').click(function(e) {
        e.preventDefault();
        if (currentPage < pageCount) {
            showPage(currentPage + 1);
        }
    });

    showPage(1); // Initialize the table by showing the first page
});

$(document).ready(function() {
    var rowsPerPage = 10;
    var rows = $('#paginatedTable3 tbody tr');
    var rowsCount = rows.length;
    var pageCount = Math.ceil(rowsCount / rowsPerPage);
    var currentPage = 1;
    var visiblePages = 5;

    function generatePageLinks() {
        var startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
        var endPage = Math.min(startPage + visiblePages - 1, pageCount);

        if (endPage - startPage < visiblePages - 1) {
            startPage = Math.max(endPage - visiblePages + 1, 1);
        }

        $('#pageLinks3').empty();
        for (var i = startPage; i <= endPage; i++) {
            var pageLink = $('<a href="#" class="page-link3" data-page="' + i + '">' + i + '</a>');
            if (i == currentPage) {
                pageLink.addClass('active3');
            }
            $('#pageLinks3').append(pageLink);
        }
    }

    function showPage(page) {
        currentPage = page;
        var startRow = (currentPage - 1) * rowsPerPage;
        var endRow = startRow + rowsPerPage;

        rows.hide();
        rows.slice(startRow, endRow).show();

        generatePageLinks();
        updateControls();
    }

    function updateControls() {
        $('#prevPage3').toggleClass('disabled3', currentPage === 1);
        $('#nextPage3').toggleClass('disabled3', currentPage === pageCount);
    }

    $('#paginationControls3').on('click', '.page-link3', function(e) {
        e.preventDefault();
        var page = $(this).data('page');
        showPage(page);
    });

    $('#prevPage3').click(function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    $('#nextPage3').click(function(e) {
        e.preventDefault();
        if (currentPage < pageCount) {
            showPage(currentPage + 1);
        }
    });

    showPage(1); // Initialize the table by showing the first page
});