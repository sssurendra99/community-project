export const getStatusColor = (status: string) => {
    switch (status) {
      case 'Low Stock':
        return 'bg-orange-100 text-orange-800';
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
};