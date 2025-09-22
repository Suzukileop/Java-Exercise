package VariablesOperateurs;
import java.util.Scanner;


// Un programme qui effectue les 4 operations (+*-/) sur deux nombres
public class CalculatriceBasique {

    public static void main(String[] args) {
        // Creation de scanner : pour lire les entrees utilisateur 
        Scanner scanner = new Scanner(System.in);

        // Question a poser et capture de donnees
        System.out.print("Entrez le premier nombre");
        int nombre1 = scanner.nextInt();

        System.out.print("Entrez le deuxieme nombre");
        int nombre2 = scanner.nextInt();

        // Calculs avec les 4 operateurs arithmetique basique 
        System.out.println("La somme de deux nombres saisies : " + (nombre1 + nombre2));
        System.out.println("La soustraction de deux nombre saisies : " + (nombre1 - nombre2));
        System.out.println("La multiplication de deux nombre saisies" + (nombre1 * nombre2));
        if(nombre2 != 0 ){
            System.out.println("la division de deux nombres saisie : " + (nombre1 / nombre2));
        } else{
            System.out.println("Operation impossible");
        }
    }
}