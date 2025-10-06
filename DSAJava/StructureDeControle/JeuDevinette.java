package DSAJava.StructureDeControle;
import java.util.Scanner;

public class JeuDevinette {
    public static void main(String[] args) {
        int nombreTour = 4;
        boolean trouver =false;

        Scanner scanner = new Scanner(System.in);

        // le systeme genere un nombre quelconque (aleatoire)
        int nombreExacte =(int) (Math.random() * 100) + 1;

        // le systeme demande au joueur de deviner le nombre 
        System.out.println("voici le nombre genere par le systeme !!!!\nJe vous demande de le deviner : ");
        int valeurSaisie = scanner.nextInt();
        
        for (int i = 0; i <nombreTour; i++) {
            if (nombreExacte == valeurSaisie) {
                trouver = true;
                break;
            } else if ( nombreExacte > valeurSaisie) {
                System.out.println("Vous avez choisi un nombre plus petit que la valeur exacte.");
                System.out.println("Reessayer");
                valeurSaisie = scanner.nextInt();
            } else {
                System.out.println("Vous avez choisi un nombre plus grand que la valeur exacte.");
                System.out.println("Reessayer");
                valeurSaisie = scanner.nextInt();
            }
        }

        if (trouver == false) {
            System.out.println("Desole, la valeur exacte est " + nombreExacte);
        } else {
            System.out.println("Felicitation, vous avez trouve la valeur exacte.");            
        }

        scanner.close();
    }
}
