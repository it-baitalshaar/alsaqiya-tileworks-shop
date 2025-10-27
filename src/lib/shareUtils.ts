export interface ShareData {
  title: string;
  text: string;
  url: string;
}

export async function shareProduct(shareData: ShareData): Promise<boolean> {
  // Check if Web Share API is supported
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      // User cancelled sharing or error occurred
      console.log('Share cancelled or failed:', error);
      return false;
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareData.url);
      
      // Show a toast notification (you can customize this)
      if (typeof window !== 'undefined' && window.alert) {
        alert(`Product link copied to clipboard!\n\n${shareData.title}\n${shareData.url}`);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      
      // Final fallback: show the URL in an alert
      if (typeof window !== 'undefined' && window.alert) {
        alert(`Share this product:\n\n${shareData.title}\n\nURL: ${shareData.url}`);
      }
      
      return false;
    }
  }
}

export function generateProductShareData(product: any, baseUrl: string = window.location.origin): ShareData {
  const productUrl = `${baseUrl}/product/${product._id}`;
  
  return {
    title: `${product.name} - Al Saqiya Premium Ceramics`,
    text: `Check out this ${product._type} from Al Saqiya: ${product.name}. ${product.description || 'Premium quality ceramics for your space.'}`,
    url: productUrl
  };
}
