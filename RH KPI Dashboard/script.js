// Initialize charts
document.addEventListener('DOMContentLoaded', function() {
  initRevenueChart();
  initAppointmentsChart();
});

function initRevenueChart() {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'Revenue From Patients Seen',
          data: [18320, 24300, 21000],
          backgroundColor: '#F97316',
          borderRadius: 4,
        },
        {
          label: 'Estimated Revenue',
          data: [27480, 45800, 36000],
          backgroundColor: '#FED7AA',
          borderRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 16,
            font: {
              size: 12,
              weight: '500'
            },
            color: '#6B7280'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 50000,
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            },
            font: {
              size: 12
            },
            color: '#9CA3AF'
          },
          grid: {
            color: '#F3F4F6'
          }
        },
        x: {
          ticks: {
            font: {
              size: 12
            },
            color: '#6B7280'
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

function initAppointmentsChart() {
  const ctx = document.getElementById('appointmentsChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Text',
          data: [8, 12, 10, 5],
          borderColor: '#06B6D4',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#06B6D4',
          pointBorderColor: '#06B6D4',
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Email',
          data: [6, 10, 8, 7],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#3B82F6',
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 16,
            font: {
              size: 12,
              weight: '500'
            },
            color: '#6B7280'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 20,
          ticks: {
            font: {
              size: 12
            },
            color: '#9CA3AF'
          },
          grid: {
            color: '#F3F4F6'
          }
        },
        x: {
          ticks: {
            font: {
              size: 12
            },
            color: '#6B7280'
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

function navigateTo(page) {
  console.log('Navigating to:', page);
  // Navigation logic will be added with new modules
}

function logout() {
  console.log('Logging out...');
  // Logout logic here
}
