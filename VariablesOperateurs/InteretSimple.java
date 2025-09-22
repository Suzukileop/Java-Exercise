package VariablesOperateurs;
import java.util.Scanner;


// calcul d'interet 
public class InteretSimple {
    public static void main(String[] args) {
        // taux fixe 
        final int taux = 5;

        // Instance de classe scanner 
        Scanner scanner = new Scanner(System.in);

        // Capital a emprunter 
        System.out.println("Entrer la valeur a emprunter : ");
        double Capital = scanner.nextInt();

        System.out.println("Durree de rembourssement (an) : ");
        double durre = scanner.nextDouble();

        double interet = (Capital * durre *taux ) / 100;

        System.out.println("Interet egale : " + interet);


        scanner.close();
        
    }
}
