package VariablesOperateurs;
import java.util.Scanner;

public class MagicModulo {
    public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    // Objectif principal : determiner le reste de la division 
    // exemple 7 = 2 (mod 5)

    // Dernier chiffre d'un nombre 
    System.out.println("Entrez un nombre : ");
    int nombre1 = scanner.nextInt();
    System.out.println("La dernier chiffre de nombre " + nombre1 + " est " + ( nombre1 % 10));

    // Nomre pair et impair 
    System.out.println("Entrez un nombre : ");
    int nombrePair = scanner.nextInt();
    if (nombrePair % 2 == 0) {
        System.out.println(nombrePair + " est un nombre pair.");
    } else {
        System.out.println(nombrePair + " est un nombre impair.");
    }

    // Creation des cycles et des boucles "des choses qui se repetes."
    // Determiner le jour de la semaine.
    System.out.println("Quel jour somme-nous ? Appuyez : ");
    System.out.println(" 0 pour Dimanche ");
    System.out.println(" 1 pour Lundi ");
    System.out.println(" 2 pour Mardi ");
    System.out.println(" 3 pour Mercredi ");
    System.out.println(" 4 pour Jeudi ");
    System.out.println(" 5 pour Vendredi ");
    System.out.println(" 6 pour Samedi ");

    int jour = scanner.nextInt();

    System.out.println("Entrez le nombre de jours à ajouter à partir d/’aujourd/’hui : ");
    int jourDeterminer = scanner.nextInt();

    int resultatJour = (jour + jourDeterminer) % 7;
    switch (resultatJour) {
        case 0 -> System.out.println("dans " + jourDeterminer + " C'est dimanche");
        case 1 -> System.out.println("dans " + jourDeterminer + " C'est Lundi");
        case 2 -> System.out.println("dans " + jourDeterminer + " C'est Mardi");
        case 3 -> System.out.println("dans " + jourDeterminer + " C'est Mercredi");
        case 4 -> System.out.println("dans " + jourDeterminer + " C'est Jeudi");
        case 5 -> System.out.println("dans " + jourDeterminer + " C'est Vendredi");
        case 6 -> System.out.println("dans " + jourDeterminer + " C'est Samedi");
        default -> System.out.println("Jour inconnu.");
    }

    // carroul d'image : Affichage d'image en boucle 

    scanner.close();

    }
}
