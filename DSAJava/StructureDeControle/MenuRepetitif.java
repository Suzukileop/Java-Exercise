package DSAJava.StructureDeControle;
import java.util.Scanner;

// exemple pour le menu d'un restaurant 
public class MenuRepetitif {
    public static void main(String[] args) {
        Boolean valide = false;
        int nombreCommande = 0;
        Scanner scanner = new Scanner(System.in);

        
        while (valide == false) {
            afficherMenu();
            int commande = scanner.nextInt();

            if (commande == 4) {
                break;
            }else{
                nombreCommande++;
            }
        }

        System.out.println("Normbre de commande : " + nombreCommande);

        
        scanner.close();
    } 
    
        public static void afficherMenu() {
        System.out.println("\n=== MENU ===");
        System.out.println("Rix : 0");
        System.out.println("sakafo : 1");
        System.out.println("eau : 2");
        System.out.println("dessert : 3");
        System.out.println("quitter : 4");
        System.out.print("Votre choix : ");
    }
}

