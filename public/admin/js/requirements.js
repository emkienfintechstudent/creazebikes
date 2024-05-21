$(document).ready(function() {
    var rowsPerPage = 10;
    var rows = $('#inactiveTable tbody tr');
    var rowsCount = rows.length;
    var pageCount = Math.ceil(rowsCount / rowsPerPage);
    var currentPage = 1;

    // Generate pagination controls
    var paginationControls = '<div id="paginationControls-inactiveTable">';
    for (var i = 1; i <= pageCount; i++) {
        paginationControls += '<a href="#" class="page-link-inactiveTable" data-page="' + i + '">' + i + '</a> ';
    }
    paginationControls += '</div>';
    $('#inactiveTable').after(paginationControls);

    // Show the first set of rows
    showPage(1);

    // Handle pagination control click
    $('.page-link-inactiveTable').click(function(e) {
        e.preventDefault();
        var page = $(this).data('page');
        showPage(page);
    });

    function showPage(page) {
        currentPage = page;
        var startRow = (currentPage - 1) * rowsPerPage;
        var endRow = startRow + rowsPerPage;

        rows.hide();
        rows.slice(startRow, endRow).show();

        $('.page-link-inactiveTable').removeClass('active-inactiveTable');
        $('.page-link-inactiveTable[data-page="' + currentPage + '"]').addClass('active-inactiveTable');
    }
});