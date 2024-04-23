
$(document).ready( async function() { 
    const response = await fetch('/api/chart-data');
    const data = await response.json();

     // Gắn sự kiện click cho button Daily
     $("#example-3-tab button").click(function() {
         // Thay đổi nội dung của thẻ <th> TODAY thành "TODAY"
         $('#1').text('TODAY');
         // Thay đổi nội dung của thẻ <th> YESTERDAY thành "YESTERDAY"
         $('#2').text('YESTERDAY');
         const currentOrder = parseInt(data.revenueReport[1].daily_order) || 0;
         const lastOrder = parseInt(data.revenueReport[0].daily_order) || 0;
       
         // Hiển thị số đơn hàng hôm nay và hôm qua
         $('#current_order').text(currentOrder);
         $('#last_order').text(lastOrder);
         const orderChangePercent = ((currentOrder - lastOrder) / lastOrder) * 100 || 0;
        $('#order_change_percent').text(orderChangePercent.toFixed(2) + '%')
           // Lấy doanh thu hôm nay và hôm qua từ dữ liệu
        const currentRevenue = parseFloat(data.revenueReport[1].daily_revenue);
        const lastRevenue = parseFloat(data.revenueReport[0].daily_revenue);

        // Hiển thị doanh thu hôm nay và hôm qua
        $('#current_revenue').text(currentRevenue);
        $('#last_revenue').text(lastRevenue);
        
        // Tính toán và hiển thị phần trăm thay đổi
        const revenueChangePercent = ((currentRevenue - lastRevenue) / lastRevenue) * 100;

        $('#revenue_change_percent').text(revenueChangePercent.toFixed(2) + '%');

        // AVG. PER CUSTOMER
        let lastAvgPerCustomer = 0;
        let currentAvgPerCustomer = 0;
        
        if (lastOrder != 0) {
            lastAvgPerCustomer = lastRevenue / lastOrder;
        }
        
        if (currentOrder != 0) {
            currentAvgPerCustomer = currentRevenue / currentOrder;
        }
        
        $('#lastAvgPerCustomer').text(lastAvgPerCustomer.toFixed(2));
        $('#currentAvgPerCustomer').text(currentAvgPerCustomer.toFixed(2));
        
        $('#lastAvgPerCustomer').text(lastAvgPerCustomer.toFixed(2));
        $('#currentAvgPerCustomer').text(currentAvgPerCustomer.toFixed(2) );

     });
  
     // Gắn sự kiện click cho button Weekly
$("#example-4-tab button").click(function() {
    // Thay đổi nội dung của thẻ <th> TODAY thành "THIS WEEK"
    $('#1').text('THIS WEEK');
    // Thay đổi nội dung của thẻ <th> YESTERDAY thành "LAST WEEK"
    $('#2').text('LAST WEEK');

    const currentOrder = parseInt(data.revenueReport[1].weekly_order) || 0;
    const lastOrder = parseInt(data.revenueReport[0].weekly_order) || 0;

    // Hiển thị số đơn hàng tuần này và tuần trước
    $('#current_order').text(currentOrder);
    $('#last_order').text(lastOrder);

    const orderChangePercent = ((currentOrder - lastOrder) / lastOrder) * 100 || 0;
    $('#order_change_percent').text(orderChangePercent.toFixed(2) + '%');

    // Lấy doanh thu tuần này và tuần trước từ dữ liệu
    const currentRevenue = parseFloat(data.revenueReport[1].weekly_revenue);
    const lastRevenue = parseFloat(data.revenueReport[0].weekly_revenue);

    // Hiển thị doanh thu tuần này và tuần trước
    $('#current_revenue').text(currentRevenue);
    $('#last_revenue').text(lastRevenue);

    // Tính toán và hiển thị phần trăm thay đổi
    const revenueChangePercent = ((currentRevenue - lastRevenue) / lastRevenue) * 100;
    $('#revenue_change_percent').text(revenueChangePercent.toFixed(2) + '%');
    // AVG. PER CUSTOMER
    let lastAvgPerCustomer = 0;
    let currentAvgPerCustomer = 0;
    
    if (lastOrder != 0) {
        lastAvgPerCustomer = lastRevenue / lastOrder;
    }
    
    if (currentOrder != 0) {
        currentAvgPerCustomer = currentRevenue / currentOrder;
    }
    
    $('#lastAvgPerCustomer').text(lastAvgPerCustomer.toFixed(2));
    $('#currentAvgPerCustomer').text(currentAvgPerCustomer.toFixed(2));
    
    $('#lastAvgPerCustomer').text(lastAvgPerCustomer.toFixed(2));
    $('#currentAvgPerCustomer').text(currentAvgPerCustomer.toFixed(2) );
});

 
    // Gắn sự kiện click cho button Monthly
$("#example-5-tab button").click(function() {
    // Thay đổi nội dung của thẻ <th> TODAY thành "THIS MONTH"
    $('#1').text('THIS MONTH');
    // Thay đổi nội dung của thẻ <th> YESTERDAY thành "LAST MONTH"
    $('#2').text('LAST MONTH');

    const currentOrder = parseInt(data.revenueReport[1].monthly_order) || 0;
    const lastOrder = parseInt(data.revenueReport[0].monthly_order) || 0;

    // Hiển thị số đơn hàng tháng này và tháng trước
    $('#current_order').text(currentOrder);
    $('#last_order').text(lastOrder);

    const orderChangePercent = ((currentOrder - lastOrder) / lastOrder) * 100 || 0;
    $('#order_change_percent').text(orderChangePercent.toFixed(2) + '%');

    // Lấy doanh thu tháng này và tháng trước từ dữ liệu
    const currentRevenue = parseFloat(data.revenueReport[1].monthly_revenue);
    const lastRevenue = parseFloat(data.revenueReport[0].monthly_revenue);

    // Hiển thị doanh thu tháng này và tháng trước
    $('#current_revenue').text(currentRevenue);
    $('#last_revenue').text(lastRevenue);

    // Tính toán và hiển thị phần trăm thay đổi
    const revenueChangePercent = ((currentRevenue - lastRevenue) / lastRevenue) * 100;
    $('#revenue_change_percent').text(revenueChangePercent.toFixed(2) + '%');
    // AVG. PER CUSTOMER
    let lastAvgPerCustomer = 0;
    let currentAvgPerCustomer = 0;
    
    if (lastOrder != 0) {
        lastAvgPerCustomer = lastRevenue / lastOrder;
    }
    
    if (currentOrder != 0) {
        currentAvgPerCustomer = currentRevenue / currentOrder;
    }
    
    $('#lastAvgPerCustomer').text(lastAvgPerCustomer.toFixed(2));
    $('#currentAvgPerCustomer').text(currentAvgPerCustomer.toFixed(2));
    
    $('#lastAvgPerCustomer').text(lastAvgPerCustomer.toFixed(2));
    $('#currentAvgPerCustomer').text(currentAvgPerCustomer.toFixed(2) );
});

 });
 